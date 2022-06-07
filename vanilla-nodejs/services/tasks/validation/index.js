function validation (body) {
  let result = { error: false };

  if (!body.content) {
    result = { error: true, resCode: 400, message: 'Content is required'};
  }

  return result
}

module.exports = {
  validation
}
