var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://step2shops.myshopify.com/admin/products.json",
  "method": "GET",
  "headers": {
    "Authorization": "Basic ZTQwNDA5MTFlMjM3NWVjYmIzZmJmYTQzNGY1MmRhNzY6OThiMDk1NzgzNmIzZTE1MjFjZTAyYjU0N2VkNDcxMWU=",
    "cache-control": "no-cache",
    "Postman-Token": "b9f8fdc4-abc1-4117-8db9-7d4d57d5315c"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});