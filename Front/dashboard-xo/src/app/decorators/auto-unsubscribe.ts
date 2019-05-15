const isFunction = (fn: any) => typeof fn === 'function';

const doUnsubscribe = (subscription: any) => {
    if (subscription && isFunction(subscription.unsubscribe)) {
        subscription.unsubscribe();
    }
};

/**
 * Decorator that unsubscribe all subscriptions of the component.
 * blacklist: an array of subscriptions to exclude.
 * event : the name of event callback to execute on.
 */
export function AutoUnsubscribe({ blackList = [], event = 'ngOnDestroy'} = {}) {
    return (constructor: any) => {
        const original = constructor.prototype[event];

        if (!isFunction(original)) {
            throw new Error(
                `${
                constructor.name
                } is using @AutoUnsubscribe but does not implement OnDestroy`
            );
        }

        constructor.prototype[event] = function() {

            for (const propName in this) {
                if (blackList.includes(propName)) {
                    continue;
                }
                const property = this[propName];
                doUnsubscribe(property);
            }

            if (isFunction(original)) {
                original.apply(this, arguments);
            }
        };
    };
}
