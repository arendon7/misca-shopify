/*
Paste into Shopify Admin > Settings > Customer events > Add custom pixel
ONLY in a development/test context.

Purpose: verify Shopify standard events and Miscas custom events.
This template sends data nowhere; it only logs inside the pixel sandbox.
*/

const miscaEvents = [
  'misca:product_card_selected',
  'misca:size_selected',
  'misca:size_guide_opened',
  'misca:size_required_prompted',
  'misca:cart_drawer_opened',
  'misca:artist_viewed',
  'misca:source_artwork_viewed',
  'misca:impact_viewed',
];

analytics.subscribe('all_standard_events', (event) => {
  console.log('[MISCA QA][standard]', event.name, event);
});

miscaEvents.forEach((eventName) => {
  analytics.subscribe(eventName, (event) => {
    console.log('[MISCA QA][custom]', event.name, event.customData);
  });
});
