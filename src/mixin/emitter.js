/**
 * @author yanglan
 * @date 12/12/2017-6:10 PM
 * @file emitter
 */

function broadcast(componentName, eventName, params) {
    const vm = this;
    vm.$children.forEach((child) => {
        const name = child.$options.componentName;

        if (name === componentName) {
            child.$emit(...[eventName].concat(params));
        } else {
            broadcast.apply(child, [componentName, eventName].concat([params]));
        }
    });
}

function broadcastAll(eventName, params) {
    const vm = this;
    vm.$children.forEach((child) => {
        child.$emit(...[eventName].concat(params));

        broadcastAll.apply(child, [eventName].concat([params]));
    });
}

export default {
    methods: {
        dispatch(componentName, eventName, params) {
            const vm = this;
            let parent = vm.$parent || vm.$root;
            let name = parent.$options.componentName;

            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;

                if (parent) {
                    name = parent.$options.componentName;
                }
            }

            if (parent) {
                parent.$emit.apply(...[eventName].concat(params));
            }
        },

        broadcast(componentName, eventName, params) {
            const vm = this;
            broadcast.call(vm, componentName, eventName, params);
        },

        broadcastAll(eventName, params) {
            const vm = this;
            broadcastAll.call(vm, eventName, params);
        }
    }
};
