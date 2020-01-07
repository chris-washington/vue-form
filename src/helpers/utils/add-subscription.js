const addSubscription = (el, subscription) => {
  el.eventSubscriptions = [...el.eventSubscriptions, subscription];
};

export default addSubscription;
