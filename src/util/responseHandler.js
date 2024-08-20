const httpStatus = require("http-status");
const { operableEntities } = require("../config/constants");

//

function getCreateResponse({ data, what }) {
  return {
    statusCode: data === null ? httpStatus[404] : 200,
    success: data === null ? false : true,
    message: data === null ? err_msg.id_not_found : success_msg.create(what),
    data,
  };
}

function getUpdateResponse({ data, what }) {
  return {
    statusCode: data === null ? httpStatus[404] : 200,
    success: data === null ? false : true,
    message: data === null ? err_msg.id_not_found : success_msg.update(what),
    data,
  };
}

function getDeletionResponse({ data, what }) {
  return {
    statusCode: data === null ? httpStatus[404] : 200,
    success: data === null ? false : true,
    message: data === null ? err_msg.id_not_found : success_msg.delete(what),
    data,
  };
}

function getErrorResponse({ error, what }) {
  if (error.code === 11000 || error.code === 11001) {
    // Duplicate key error
    return {
      statusCode: httpStatus[409],
      success: false,
      message: err_msg.conflict(what),
    };
  }
  // Other errors
  throw error;
}

const success_msg = {
  create: (what) => `${what} created successfully`,
  delete: (what) => `${what} deleted successfully`,
  update: (what) => `${what} updated successfully`,
  fetch: (what) => `${what} fetched successfully`,
};

const err_msg = {
  creation_failed: "Creation failed",
  id_not_found: "id not found",
  invalid: "Invalid Request",
  bad_req: "Bad Request",
  not_found: (what) => `${what} not found`,
  server_error: "Internal Server Error",
  unauthorized: "Unauthorized Access",
  forbidden: "Forbidden Access",
  conflict: (what) => `${what} already exists`,
  no_data: `No Data`,
};

module.exports = {
  getCreateResponse,
  getUpdateResponse,
  getDeletionResponse,
  getErrorResponse,
  success_msg,
  err_msg,
};
