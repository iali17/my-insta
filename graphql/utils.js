import { ObjectID } from 'bson';

export async function limitQueryWithId(query, before, after) {
  let filter = {}, hasBefore = false, hasAfter = false;

  if (before || after ){
    filter._id = {};

    if (before) {
      filter._id.$lt = ObjectID(before.value);
      let hasNextFilter = {_id: { '$gte': ObjectID(before.value)}}
      if (await query.find(hasNextFilter).count() > 0) {
        hasAfter = true;
      }
    }

    if (after) {
      filter._id.$gt = ObjectID(after.value);
      let hasBeforeFilter = {_id: { '$lte': ObjectID(after.value)}}
      if (await query.find(hasBeforeFilter).count() > 0) {
        hasBefore = true;
      }
    }
  }

  return [query.find(filter), hasBefore, hasAfter]
}

export async function filterByIdList(collection, ids) {
  let filter = {_id: { "$in": ids } };
  return collection.find(filter);
}

export async function applyPagination(query, first, last, before, after) {
  let count, startCursor = null, endCursor = null;

  if (first || last) {
    count = await query.count();
    let limit;
    let skip;
    
    if (first && first < 0) {
      throw Error
    } else if (first && count > first) {
      limit = first;
    }

    if (last) {
      if (last < 0) {
        throw Error
      } else if (limit && limit > last) {
        skip = limit - last;
        limit = limit - skip;
      } else if (!limit && count > last) {
        skip = count - last;
      }
    }

    if (skip) {
      query.skip(skip);
    }

    if (limit) {
      query.limit(limit);
    }
  }

    let elements = await query.toArray()
    if (elements.length > 0) {
      // get the first cursor
      endCursor =  elements[0]._id
      startCursor = elements[elements.length - 1]._id
    }


  return {
    hasNextPage: Boolean((first && (count > first)) || after),
    hasPreviousPage: Boolean((last && (count > last)) || before ),
    endCursor: endCursor,
    startCursor: startCursor
  };
}