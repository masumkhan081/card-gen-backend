const operableEntities = {
  country: "country",
  club: "club",
  player: "player",
};

const paginationFields = ["page", "limit", "sortBy", "sortOrder"];
const defaultViewLimit = 10;
const defaultSortOrder = "desc";

// may be changed based on the outcome expected
const map_default_sort_by = {
  [operableEntities.club]: "name",
  [operableEntities.country]: "name",
  [operableEntities.player]: "name",
  
};

const map_searchables = {
  [operableEntities.player]: ["name"],
  [operableEntities.club]: ["name"],
  [operableEntities.country]: ["name"],
};

module.exports = {
      paginationFields,
      defaultViewLimit,
      map_searchables,
      defaultSortOrder,
      map_default_sort_by,
      operableEntities, 
    };
