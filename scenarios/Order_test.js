const {faker} = require('@faker-js/faker');
const Product = require('../data/productFactory.js');
const User = require('../data/userFactory.js');

Feature('Order');

Before (({I, loginPage}) => {
    I.login("standard_user", secret('secret_sauce'));
})

Scenario("second test", ({I, loginPage, productPage, cartPage, checkoutFirstPage, checkoutSecondPage, checkoutCompletePage, inventoryPage } ) => {

    let productData = Product.build();
    let userData = User.build();

    productPage.openProductCard();
    productPage.waitForOpened();
    productPage.addProductToCart();
    productPage.waitForVisible();
    productPage.assertNumberOfProducts(productData);
    productPage.goToCart();

    cartPage.openCart();
    cartPage.assertProduct(productData);
    cartPage.completeProduct();

    checkoutFirstPage.waitForOpened();
    checkoutFirstPage.fillAddress(userData);

    checkoutSecondPage.waitCheckoutSecondPage();
    checkoutSecondPage.assertProduct(productData);
    checkoutSecondPage.checkProduct();

    checkoutCompletePage.waitForOpened();
    checkoutCompletePage.assertCompleteOrder();
    checkoutCompletePage.completeOrder();

    inventoryPage.waitAllProducts();

}).tag("test1")

Scenario("third test", ({I, loginPage, inventoryPage, cartPage}) => {

    let productsNames = { firstProduct: "Test.allTheThings() T-Shirt (Red)", secondProduct: "Sauce Labs Onesie"}
    let numberOfProducts = { countOfProducts: 2, countOfProducts2: "1" }

    inventoryPage.waitAllProducts();
    inventoryPage.sortAllProducts();
    inventoryPage.assertProducts(productsNames);
    inventoryPage.addProducts();
    inventoryPage.waitForVisible();
    inventoryPage.assertCountOfProducts(numberOfProducts);
    inventoryPage.goToCart();

    cartPage.openCart();
    cartPage.assertTwoProducts(productsNames);
    cartPage.removeFirstProduct();
    cartPage.assertCountOfProducts(numberOfProducts);
    cartPage.removeSecondProduct();
    cartPage.returnToProductPage();

    loginPage.waitForOpen();

}).tag("test2")

Scenario("4 test", ({I, loginPage, inventoryPage, cartPage,checkoutFirstPage,checkoutSecondPage,checkoutCompletePage}) => {
    let productsNames2 = { firstProduct: "Sauce Labs Backpack", secondProduct: "Sauce Labs Bike Light"}
    let numberOfProducts2 = { countOfProducts: "2", countOfProducts2: "1" }
    let product = { name: "Sauce Labs Backpack", coast: "$29.99" }

    inventoryPage.waitAllProducts();
    inventoryPage.assertProducts2(productsNames2);
    inventoryPage.addProducts2();
    inventoryPage.waitForVisible();
    inventoryPage.assertCountOfProducts2(numberOfProducts2);
    inventoryPage.goToCart();

    cartPage.openCart();
    cartPage.assertTwoProducts2(productsNames2);
    cartPage.removeSecondProduct2();
    cartPage.assertCountOfProducts2(numberOfProducts2);
    cartPage.completeProduct();

    checkoutFirstPage.waitForOpened();
    checkoutFirstPage.fillAddress();

    checkoutSecondPage.waitCheckoutSecondPage();
    checkoutSecondPage.assertProduct2(product);
    checkoutSecondPage.checkProduct();

    checkoutCompletePage.waitForOpened();
    checkoutCompletePage.assertCompleteOrder();
    checkoutCompletePage.completeOrder();

    loginPage.waitForOpen();

}).tag("test3")

Scenario("5 test", ({I, loginPage, inventoryPage, cartPage,checkoutFirstPage,checkoutSecondPage,checkoutCompletePage}) => {
    let productsNames3 = {
        firstProduct: "Sauce Labs Backpack",
        secondProduct: "Sauce Labs Bike Light",
        thirdProduct: "Sauce Labs Bolt T-Shirt",
    }
    let numberOfProducts2 = { countOfProducts: "2", countOfProducts2: "1" }
    let product = { name: "Sauce Labs Backpack", coast: "$29.99" }
    let product2 = { name: "Sauce Labs Bolt T-Shirt", coast: "$15.99"}


    inventoryPage.waitAllProducts();
    inventoryPage.assertProducts2(productsNames3);
    inventoryPage.addProducts2();
    inventoryPage.waitForVisible();
    inventoryPage.assertCountOfProducts2(numberOfProducts2);
    inventoryPage.goToCart();

    cartPage.openCart();
    cartPage.assertTwoProducts2(productsNames3);
    cartPage.removeSecondProduct2();
    cartPage.assertCountOfProducts2(numberOfProducts2);
    cartPage.continueShopping();

    inventoryPage.waitAllProducts();
    inventoryPage.addProduct3();
    inventoryPage.goToCart();

    cartPage.openCart();
    cartPage.assertTwoProducts3(productsNames3);
    cartPage.completeProduct();

    checkoutFirstPage.waitForOpened();
    checkoutFirstPage.fillAddress();

    checkoutSecondPage.waitCheckoutSecondPage();
    checkoutSecondPage.assertProduct2(product);
    checkoutSecondPage.assertProduct3(product2);
    checkoutSecondPage.checkProduct();

    checkoutCompletePage.waitForOpened();
    checkoutCompletePage.assertCompleteOrder();
    checkoutCompletePage.completeOrder();

    loginPage.waitForOpen();

}).tag("test4")


After(async ({I}) => {
    await I.say("Test ended");
})

