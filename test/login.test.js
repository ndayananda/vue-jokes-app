import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import flushPromises from 'flush-promises';
import '@testing-library/jest-dom'
import Login from './../src/views/Login.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

function createStore(storeConfig) {
    const defaultConfig = {

    };

    return new Vuex.Store(Object.assign(defaultConfig, storeConfig));
}

function createWrapper(options) {
    const defaultOptions = {
        localVue,
        mocks: {
            $router: {
                push: jest.fn()
            }
        },
        store: createStore()
    };

    return mount(Login, Object.assign(defaultOptions, options));
}

describe('Login View', () => {
    // Now mount the component and you have the wrapper
    let wrapper;

    beforeEach(() => wrapper = createWrapper());

    it('renders the correct login markup', () => {
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('has a login button', () => {
      expect(wrapper.find('button').exists()).toBe(true);
    });

    it('should return invalid on click of login button without entering the email or password', () => {
        const button = wrapper.find('button');
        button.trigger('click');
        expect(wrapper.vm.isInvalid).toBeTruthy();
    });

    it('will thorw invalid email error', async () => {
        await wrapper.setData({username: 'test@'});

        await wrapper.find('.login__form-email-input').trigger('blur');

        expect(wrapper.vm.isUserNameInvalid).toBeTruthy();
        expect(wrapper.element.querySelector('.login__form-email-error')).toBeVisible()
    });

    it('is a valid username/email', async () => {
        await wrapper.setData({username: 'test@test.com'});

        await wrapper.find('.login__form-email-input').trigger('blur');

        expect(wrapper.vm.isUserNameInvalid).not.toBeTruthy();
    });

    it('will thorw invalid password error', async () => {
        await wrapper.setData({password: 'welcome123'});

        await wrapper.find('.login__form-password-input').trigger('blur');

        expect(wrapper.vm.isPasswordInvalid).toBeTruthy();
        expect(wrapper.element.querySelector('.login__form-password-error')).toBeVisible()
    });

    it('is a valid password', async () => {
        await wrapper.setData({password: 'abcStraatee123'});

        await wrapper.find('.login__form-password-input').trigger('blur');

        expect(wrapper.vm.isUserNameInvalid).not.toBeTruthy();
    });

    it('After successfull login route to /jokes', async () => {
        expect.assertions(3);

        const auth = {
            namespaced: true,
            state: {},
            actions: {
                login: jest.fn().mockResolvedValue()
            }
        };

        const store = createStore({ modules: { auth }});

        const wrapper = createWrapper({store});
        await wrapper.setData({ username: 'admin', password: 'abcStraatee123'});

        await wrapper.find('button').trigger('click');

        await flushPromises();

        expect(auth.actions.login).toHaveBeenCalled();
        expect(wrapper.vm.$router.push).toHaveBeenCalled();
        expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/jokes');
    });
  })