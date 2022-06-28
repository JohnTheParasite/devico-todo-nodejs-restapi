interface ValidationResult {
  error: boolean,
  resCode?: number,
  message?: string
}

interface BodyInterface {
  content?: string,
  done?: boolean
}

function constructResult(message?:string): ValidationResult {
  let result: ValidationResult = { error: false };

  if (message) {
    result = { error: true, resCode: 400, message};
  }

  return result
}

export function createTodoValidation (body: BodyInterface): ValidationResult {
  if (!body.content) {
    return constructResult('Content is required')
  }
  return constructResult()
}

export function toggleAllDoneProperty (body: { done?: boolean }): ValidationResult {
  if (!body.hasOwnProperty("done")) {
    return constructResult('Done property is required')
  } else if (typeof(body.done) !== "boolean") {
    return constructResult('Done property should be boolean type')
  }

  return constructResult()
}
