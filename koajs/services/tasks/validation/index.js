export function validation (body) {
  let result = { error: false };

  if (!body.content) {
    result = { error: true, resCode: 400, message: 'Content is required'};
  }

  return result
}

export function doneProperty (body) {
  let result = { error: false };

  if (!body.hasOwnProperty("done")) {
    result = { error: true, resCode: 400, message: 'Done property is required'};
  } else if (typeof(body.done) !== "boolean") {
    result = { error: true, resCode: 400, message: 'Done property should be boolean type'};
  }

  return result
}

export default {
  validation
}
