import './index';

describe('test bootstrap application', () => {
    it('should be able to bootstrap the application', () => {
        const container = document.createElement('div');
        window.AiWorkshop({}, container);
    });
});
