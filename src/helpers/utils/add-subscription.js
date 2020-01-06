export default function addSubscription(el, subscription) {
  const subscriptions = el.eventSubscriptions;
  subscriptions.push(subscription);
}
