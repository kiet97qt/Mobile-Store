'use strict';
const Grid = require('gridfs-stream');
const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const Logger = require('./logger');
const logger = new Logger('mongoUtil');
const config = require('../config')();

module.exports = class MongoUtil {
  async init(connectionString) {
    this.mongoose = await mongoose.createConnection(connectionString, config.database.connectionOptions);
    const database = await MongoClient.connect(connectionString, {
      maxPoolSize: config.database.maxPoolSize,
      connectTimeoutMS: config.database.connectTimeoutMS,
    });
    this.db = database.db(config.database.mongoInitdbDatabase);
    this.gfs = await Grid(this.db, mongo);
  }

  async close() {
    //Close main DB connection
    try {
      if (this.mongoose) {
        await this.mongoose.close();
      }
      if (this.db) {
        await this.db.close();
      }
    } catch (err) {
      logger.error(`Unable to close main DB connection. Error: ${err.message}`);
    }
  }

  async find(schemaName, query, sort = {}, limit) {
    if (limit) {
      return await this.db.collection(schemaName).find(query).sort(sort).limit(limit).toArray();
    } else {
      return await this.db.collection(schemaName).find(query).sort(sort).toArray();
    }
  }

  async findwithProject(schemaName, query, project = {}, sort = {}) {
    return await this.db.collection(schemaName).find(query, project).sort(sort).toArray();
  }

  async findOne(schemaName, query) {
    return await this.db.collection(schemaName).findOne(query);
  }

  async findOneWithProject(schemaName, query, project = {}) {
    return await this.db.collection(schemaName).findOne(query, project);
  }

  async findAll(schemaName, query = {}) {
    return await this.db.collection(schemaName).find(query).toArray();
  }

  async paginatedSearch(
    schemaName,
    pipeline,
    sort = {},
    arrayResultName,
    skip = 0,
    limit = null,
    useDisk = false,
    sortPush = false,
  ) {
    if (isNaN(skip)) {
      skip = 0;
    }
    if (Object.keys(sort).length > 0) {
      if (sortPush === true) {
        pipeline.push({
          $sort: sort,
        });
      } else {
        pipeline.unshift({
          $sort: sort,
        });
      }
    }
    if (limit) {
      pipeline.push({
        $facet: {
          metadata: [{ $count: 'total' }],
          [arrayResultName]: [{ $skip: skip }, { $limit: limit }],
        },
      });
    } else {
      pipeline.push({
        $facet: {
          metadata: [{ $count: 'total' }],
          [arrayResultName]: [{ $skip: skip }],
        },
      });
    }

    logger.info(`query to paginated results: ${JSON.stringify(pipeline)}`);
    return await this.db.collection(schemaName).aggregate(pipeline, { allowDiskUse: useDisk }).toArray();
  }

  async distinct(schemaName, fieldName) {
    return await this.db.collection(schemaName).distinct(fieldName);
  }

  async distinctWithQuery(schemaName, fieldName, query) {
    return await this.db.collection(schemaName).distinct(fieldName, query);
  }

  async updateOne(schemaName, query, newValues) {
    let response;
    try {
      response = await this.db.collection(schemaName).updateOne(query, newValues);
    } catch (err) {
      throw err;
    }
    return response;
  }

  async updateOneOrUpsert(schemaName, query, newValues, upsert = false) {
    let response;
    try {
      response = await this.db.collection(schemaName).updateOne(query, newValues, { upsert: upsert });
    } catch (err) {
      throw err;
    }
    return response;
  }

  async updateMany(schemaName, query, newValues) {
    let response;
    try {
      response = await this.db.collection(schemaName).updateMany(query, newValues, { multi: true });
    } catch (err) {
      throw err;
    }
    return response;
  }

  async aggregate(schemaName, pipeline, options) {
    return await this.db.collection(schemaName).aggregate(pipeline, options).toArray();
  }

  async insertOne(schemaName, document) {
    let response;
    try {
      response = await this.db.collection(schemaName).insertOne(document);
    } catch (err) {
      throw err;
    }
    return response;
  }

  async insertMany(schemaName, documents) {
    let response;
    try {
      response = await this.db.collection(schemaName).insertMany(documents);
    } catch (err) {
      throw err;
    }
    return response;
  }

  async deleteOne(schemaName, query) {
    let response;
    try {
      response = await this.db.collection(schemaName).deleteOne(query);
    } catch (err) {
      throw err;
    }
    return response;
  }

  async createIndex(schemaName, indexFilter, isUnique) {
    let response;
    try {
      response = await this.db.collection(schemaName).createIndex(indexFilter, { unique: isUnique });
    } catch (err) {
      throw err;
    }
    return response;
  }

  async deleteDocument(id) {
    try {
      let query = {
        _id: id,
      };
      let chunksQuery = {
        files_id: id,
      };
      let gfs = Grid(this.db, mongo);

      try {
        await gfs.files.remove(query);
      } catch (err) {
        throw err;
      }

      try {
        gfs.db.collection('fs.chunks').remove(chunksQuery);
      } catch (err) {
        throw err;
      }
      return {
        status: 'SUCCESS',
        message: 'Document: ' + id + ' has been deleted',
      };
    } catch (err) {
      throw err;
    }
  }

  async queryDocuments(query) {
    try {
      var gfs = Grid(this.db, mongo);
      var results = [];
      try {
        results = await gfs.files.find(query).toArray();
        var documents = [];
        results.forEach((file) => {
          var document = {
            documentID: file.metadata.documentID,
            entityID: file.metadata.entityID,
            name: file.filename,
            documentType: file.metadata.documentType,
            description: file.metadata.description,
            contentType: file.contentType,
            uploadDate: file.uploadDate,
            expiryDate: file.expiryDate || 'n/a',
          };
          documents.push(document);
        });

        return documents;
      } catch (err) {
        throw err;
      }
    } catch (err) {
      throw err;
    }
  }

  async readDocumentFileContent(documentID, encode) {
    const gfs = Grid(this.db, mongo);
    let buffer = [];
    return new Promise((resolve, reject) => {
      gfs
        .createReadStream({
          _id: documentID,
        })
        .on('error', (err) => {
          throw reject(err);
        })
        .on('data', (chunk) => {
          buffer.push(chunk);
        })
        .on('end', () => {
          resolve(Buffer.concat(buffer).toString(encode));
        });
    });
  }

  async queryDocumentsWithFileContent(query, contentEncode = 'base64') {
    try {
      try {
        let documents = await this.queryDocuments(query);
        for (let document of documents) {
          let fileContent = this.readDocumentFileContent(document.documentID, contentEncode);
          document.content = fileContent;
          document.contentEncode = contentEncode;
        }

        return documents;
      } catch (err) {
        throw err;
      }
    } catch (err) {
      throw err;
    }
  }

  async queryOneDocumentWithFileContent(documentID, contentEncode = 'base64') {
    try {
      try {
        let document = await this.queryDocument(documentID);

        let fileContent = this.readDocumentFileContent(documentID, contentEncode);
        document.content = fileContent;
        document.contentEncode = contentEncode;

        return document;
      } catch (err) {
        throw err;
      }
    } catch (err) {
      throw err;
    }
  }

  async queryDocument(documentID) {
    try {
      let filter = {
        'metadata.documentID': documentID,
      };
      let gfs = Grid(this.db, mongo);

      const { promisify } = require('util');
      const findOne = promisify(gfs.findOne).bind(gfs);
      return await findOne(filter);
    } catch (err) {
      logger.error(`Error: queryDocument(), Message: ${err.message}, Stack: ${err.stack}`);
      throw err;
    }
  }

  async batchUpdate(schemaName, useLegacyOps, filter, set) {
    let response;
    try {
      let col = this.db.collection(schemaName);

      let batch = col.initializeUnorderedBulkOp({
        useLegacyOps: useLegacyOps,
      });

      batch.find(filter).update(set);

      response = await batch.execute();
    } catch (err) {
      throw err;
    }
    return response;
  }

  async countDocuments(schemaName, query) {
    return await this.db.collection(schemaName).count(query);
  }

  async setExpireTime(schemaName, value) {
    let response;
    try {
      response = await this.db.collection(schemaName).createIndex({ exp: 1 }, { expireAfterSeconds: value });
    } catch (err) {
      throw err;
    }
    return response;
  }

  async replaceOne(schemaName, query, newValues) {
    let response;
    try {
      response = await this.db.collection(schemaName).replaceOne(query, {
        $set: newValues,
      });
    } catch (err) {
      throw err;
    }
    return response;
  }
};
