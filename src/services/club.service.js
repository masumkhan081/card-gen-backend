const { operableEntities } = require("../config/constants");
const Club = require("../model/club.model");
const { getSearchAndPagination } = require("../util/pagination");

//

async function getClubsAll() {
  try {
    const fetchResult = await Club.find().skip(0).limit(0);
    const total = await Club.countDocuments();
    return {
      meta: {
        total,
      },
      data: fetchResult,
    };
  } catch (error) {
    return error;
  }
}

async function getClubs(query) {
  try {
    const {
      currentPage,
      viewLimit,
      viewSkip,
      sortBy,
      sortOrder,
      filterConditions,
      sortConditions,
    } = getSearchAndPagination({ query, what: operableEntities.Club });

    const fetchResult = await Club.find(filterConditions)
      .sort(sortConditions)
      .skip(viewSkip)
      .limit(viewLimit);

    const total = await Club.countDocuments(filterConditions);
    return {
      meta: {
        total,
        limit: viewLimit,
        page: currentPage,
        skip: viewSkip,
        sortBy,
        sortOrder,
      },
      data: fetchResult,
    };
  } catch (error) {
    return error;
  }
}

async function updateClub({ id, data }) {
  try {
    const editResult = await Club.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteClub(id) {
  try {
    const deleteResult = await Club.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

module.exports = { getClubs, getClubsAll, deleteClub, updateClub };
