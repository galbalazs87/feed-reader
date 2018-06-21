/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs are defined and not EMPTY', function() {
            allFeeds.forEach(feed => {
                const URL = feed.url;
                expect(URL).toBeDefined();
                expect(URL.length).toBeGreaterThan(0);
            })
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('feeds have name and not EMPTY', function() {
            allFeeds.forEach(feed => {
                const name = feed.name;
                expect(name).toBeDefined();
                expect(name.length).toBeGreaterThan(0);
            })
        });
    });


    /* A test suite named "The menu" to check the menu */

    describe('The menu', function() {
        it('The menu is hidden initially', function () {
            expect($('.menu-hidden').is(':visible')).toBe(true);
        });

        /* A test that ensures the menu element is
         * hidden by default.
         */
        it('The menu is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
          });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('The menu changes visibility on icon click', function () {
            // Get the menu icon
            const icon = $('.menu-icon-link')
      
            // Check the first click on the menu icon
            icon.trigger('click')
            // The menu should become visible
            expect($('body').hasClass('menu-hidden')).toBe(false);
      
            // Check the second click on the menu icon
            icon.trigger('click')
            // The menu should become hidden
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
        });

    /* A new test suite named "Initial Entries" */

        /* Atest that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
    describe('Initial Entries', function() {
            // it runs before the test
            beforeEach(function(done) {
                loadFeed(0, done);
            });

            it('initial element is there', function(){
                expect($('.feed .entry').length).toBeGreaterThan(0);
            });
        });

    /* A new test suite named "New Feed Selection" */

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
    describe('New Feed Selection', function(){
            var testFeed;            

            beforeEach(function(done) {
                loadFeed(0, function() {
                    testFeed = $('.feed').html();
                    loadFeed(1, done);
                });
            });

            // Check for the news feed to not be the same as before
            it('New feed has been loaded', function(){
                expect($('.feed').html()).not.toEqual(testFeed);
            });
        });
}());
