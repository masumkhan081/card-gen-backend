const httpStatus = require("http-status");
//
//
function sendFetchResponse({ res, data, what }) {
  res.send({
    statusCode: data === null ? httpStatus[404] : 200,
    success: data === null ? false : true,
    message: data ? success_msg.fetch(what) : err_msg.no_data,
    data,
  });
}

function sendCreateResponse({ res, data, what }) {
  res.send({
    statusCode: data === null ? httpStatus[404] : 200,
    success: data === null ? false : true,
    message: data === null ? err_msg.id_not_found : success_msg.create(what),
    data,
  });
}

function sendUpdateResponse({ res, data, what }) {
  console.log("D:" + data + "w:" + what);
  res.send({
    statusCode: data === null ? httpStatus[404] : 200,
    success: data === null ? false : true,
    message: data === null ? err_msg.id_not_found : success_msg.update(what),
    data,
  });
}

function sendDeletionResponse({ res, data, what }) {
  res.send({
    statusCode: data === null ? 404 : 200,
    success: data === null ? false : true,
    message: data === null ? err_msg.id_not_found : success_msg.delete(what),
    data,
  });
}

function sendErrorResponse({ res, error, what }) {
  let statusCode;
  let message = ""; 

  //  in case of required fields missing
  if (error?.name == "ValidationError") {
    message =
      error._message + ": [" + Object.keys(error.errors).join(",") + "]";
    statusCode = 400;
  }
  // Duplicate key error
  else if (error?.code === 11000 || error?.code === 11001) {
    statusCode = 409;
    message = err_msg.conflict(what);
  }
  // all the other cases
  else {
    statusCode = 500;
    message = err_msg.server_error;
  }
  res.send({
    statusCode,
    success: false,
    message,
  });
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
  fail_in_update: (what) => `${what} failed to update`,
};

const err_custom = {
  already_exist: {
    code: 11000,
  },
};

module.exports = {
  sendFetchResponse,
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendUpdateResponse,
  success_msg,
  err_msg,
  err_custom,
};
