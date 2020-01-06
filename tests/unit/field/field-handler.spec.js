import FieldHandler from '@/field/field-handler';

jest.mock('@/field/field-events');
jest.mock('@/field/field-validator');
jest.mock('@/field/field-event-handler');

describe('field/field-handler.js', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when initialized', () => {
    let fieldHandler;
    let el;
    let validatorInfo;
    const name = 'myName';

    beforeEach(() => {
      el = {
        dataset: {
          formField: name,
        },
      };

      validatorInfo = jest.fn();
      fieldHandler = new FieldHandler(el, validatorInfo);
    });

    it('then it is properly intializaed', () => {
      expect(fieldHandler.el).toEqual(el);
      expect(fieldHandler.name).toBe(name);
      expect(fieldHandler.validatorInfo).toEqual(validatorInfo);
    });

    describe('when init is called', () => {

    });
  });
});
