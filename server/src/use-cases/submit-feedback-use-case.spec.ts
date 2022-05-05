import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => { 
    
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64, aushaushauhs',
    })).resolves.not.toThrow();
  });


  it('should not be able to submit feedback without type', async () => {
    
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64, aushaushauhs',
    })).rejects.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled;
    expect(sendMailSpy).toHaveBeenCalled;
  });

  it('should not be able to submit feedback without comment', async () => {
    
    await expect(submitFeedback.execute({
      type: 'type',
      comment: '',
      screenshot: 'data:image/png;base64, aushaushauhs',
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback with an invalid screenshot', async () => {
    
    await expect(submitFeedback.execute({
      type: 'type',
      comment: 'ta tudo bugado',
      screenshot: 'test.jpg',
    })).rejects.toThrow();
  });
})