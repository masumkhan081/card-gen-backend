const { operableEntities } = require("../config/constants");
const Card = require("../model/card.model");
const { getSearchAndPagination } = require("../util/pagination");

async function getCardsAll() {
  try {
    const fetchResult = await Card.find().skip(0).limit(0);
    const total = await Card.countDocuments();
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

async function updateCard({ id, data }) {
  try { 
    const editResult = await Card.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteCard(id) {
  try {
    const deleteResult = await Card.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

async function getCards(query) {
  try {
    const {
      currentPage,
      viewLimit,
      viewSkip,
      sortBy,
      sortOrder,
      filterConditions,
      sortConditions,
    } = getSearchAndPagination({ query, what: operableEntities.Card });

    const fetchResult = await Card.find(filterConditions)
      .sort(sortConditions)
      .skip(viewSkip)
      .limit(viewLimit);

    console.log("got hit 2");

    const total = await Card.countDocuments(filterConditions);
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

module.exports = { getCards, getCardsAll, deleteCard, updateCard };
