function createFeedbackMessage (type: FeedbackMessage['type'], message: FeedbackMessage['message']): FeedbackMessage {
  return { type, message }
}

export function feedbackErrorMessage (message: FeedbackMessage['message']): FeedbackMessage {
  return createFeedbackMessage('danger', message)
}
export function feedbackSuccessMessage (message: FeedbackMessage['message']): FeedbackMessage {
  return createFeedbackMessage('success', message)
}
export function feedbackWarnuingMessage (message: FeedbackMessage['message']): FeedbackMessage {
  return createFeedbackMessage('warning', message)
}
export function feedbackInfoMessage (message: FeedbackMessage['message']): FeedbackMessage {
  return createFeedbackMessage('info', message)
}
export function feedbackDefaultMessage (message: FeedbackMessage['message']): FeedbackMessage {
  return createFeedbackMessage('light', message)
}

export default createFeedbackMessage
