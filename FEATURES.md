#LemonStand theme development / testing checklist

##Overall site layout (sitemap)
* Homepage
* Category page(s)
* Product page(s)
* Cart page
* Checkout page(s)
  * Receipt page
* Login page
    * Order history
    * Order detail/receipt page
  * Shipping tracking info
  * Change email + password 
  * View/edit saved shipping & billing address 
* Register page (Linked to here on registration)
* Forgot password page
* Contact page
* About page
* Manufacturer page(s)
* Blog archive page
  * Blog post page(s)
* Search results page
* Coming soon page / maintenance page
* Not Found/404 page

##Key Features
###Global
* Search
* Mini cart (different themes may call it “shopping bag”, etc.)
  * Summarized item list
  * Sub-total
  * View cart + checkout button or links
* Newsletter signup field (often times in footer)
  * Connect to Mailchimp (theme customization for list ID and API key)
* Validation styling
  * Customer registration, checkout, log-in
###Home page
* Default product collection
  * The collection could should be ‘featured’ to match the default collection for new stores. There should also be a fallback in case no collections exist.
* Latest blog posts (could be toggled on/off using theme option)
* Promotion image/link banner slider
* All sections of the homepage should be toggleable. In example if a theme has a text section on the homepage, this section should be togglable from the theme settings.
###Product page
If a certain setting is not turned on or being used don’t show it. For example if there is no volumetric pricing, don’t show a volumetric pricing title or empty table.
Mandatory things of product pages are: Title, price, quantity, images. The rest are optional
* SEO name for `<title>` (fallback to product name)
* Sale price (with base price crossed out)
* Product SKU
* Multiple product images
* Product options
* Product extras
* Product attributes (name + value in table)
* Short + long description
* Manufacturer (with link to manufacturer page, if product has manufacturer assigned)
* Product dimensions and weight (if > 0)
* Inventory (how many left in stock, if “track inventory” option is selected for product)
* Related products
* Upsells / Cross sells
* Product reviews
  * Total reviews number
  * Average rating
  * Title, comment, rating, author name
* Volume pricing tiers
  * If a product has volume pricing configured, they should show up on the product page (usually below the main description) as a list, or a table, showing pricing per unit by quantity. Example:
    * 10 - 19: $9/each
    * 20 - 29: $8.50/each
###Product listing / category page
* Category navigation list with at least 3 levels of sub-categories
* Product image(s)
* Product base price
  * Sale price
  * Item specific discounts with no coupon codes show discounted price
* Product sorting:
  * Alphabetical
  * Date added
  * Price
* Manufacturer page
* Linked to from product page (if manufacturer is assigned to product)
* Display all products from X manufacturer
###Cart page
* Guest / login pathway (we should decide best UX for this)
  * Ideally should allow low-friction checkout, with ability to register *after* completing the purchase (not possible in LS at the moment). Or allow user to set their password in-context during the checkout itself.
* Cart items list
  * Item base price
  * Item discount price
  * Line subtotal
  * Product image
  * Link back to product page
  * Selected product options and extras
* Subtotal
* Total discounts
* Subscription setup fee (when applicable)
* Shipping rate estimator
  * Total tax if address is available
* Coupon code field
  * If coupon code is entered, visually show this (with the actual code), with the ability to remove or change the coupon code
* Upsells / cross-sells (could be toggled on/off using theme option)
###Checkout page(s)
* Mini order review during checkout process
* “Ship to billing address” checkbox feature
* “Using shipping address for billing” checkbox feature (consider visually hiding the billing address unless says otherwise)
* Shipping estimated delivery time (if available from payment method)
* Show coupon code (with option to remove or change it)
* Support Amazon payments and PayPal express flows out of the box
  * Automatic if these payment methods are enabled
* Support all other payment methods (make sure the credit card form styling works out of the box)
* “Accepts marketing” checkbox ticked by default
###Blog
* /blog page with post archive (paginated)
  * Blog category list
  * Each post with featured image, author, date, category
* Blog post page
  * Title, date, category
  * Featured image
  * Author bio
    * Social links
###CMS Pages
* 1 - 3 different page templates for basic but different layouts
  * Will require ability for pages to handle multiple content regions in a simple way (not yet available)
###My Account area
* Login page
  * Forgot password link going to page or modal
  * Errors show up under fields when missing/filled incorrectly.
* Registration page
  * Sign up for email list is ticked by default
  * Errors show up under fields when missing/filled incorrectly. Error responses are sent from LemonStand for these cases
* Order history
  * List of orders
  * Order detail page showing receipt
* Change email and password
* View / update saves shipping and billing address
* “Accepts Marketing” checkbox
  * Use language like “Get occasional email updates from us”
###Customer Registration page
* Standard fields for registering
###Carts and Order Summaries
* The cart order totals/cart-discounts/item-discounts should match the checkout totals, receipt totals and order history totals. They should be consistent with each other and show item sales, item discounts, and cart discounts clearly and concisely. 
* Tips for concise checkouts:
  * To show discount/sales beside items cross out the original price and have the discount beside it
  * Having a total discounts section in the order summary helps clear up confusion
###Contact page
* Use contact form feature
###Coming Soon page
* This is meant as a landing page for merchants to use while they’re setting up their store.
  * Simple coming soon page template with a mailchimp form (tied to mailchimp list ID and API configured as a theme customization option)

##Product and category image handling
We need to establish some best-practices for image output settings to accommodate the most possible product images. Different retailers will have their product shots in different aspect ratios, different resolutions and sometimes won’t even be consistent across 1 company’s product catalog.
Some of this can be done with smart image output Twig code, and also some using theme options (perhaps by selecting between 3 different common aspect ratios).

##Tech considerations
* Minimize / combine CSS and Javascript files into 1 file each
  * Load JavaScript in footer asynchronously wherever possible
* Encouraged to use SASS
* Encouraged to use a standard (ideally, a lightweight one) CSS framework for layout
* Provide a custom CSS theme customization option (which uses a code editor) with some default selectors to help people get started. Output this as internal stylesheet across all theme pages.
* Where possible, only display things if they exist/aren’t null. For example:
  * If there’s no related products set for a particular product, hide the entire section for them on the product page.
  * If there’s no short description, don’t show it (or it’s container HTML element)
  * If there’s product pricing tiers available for the currently logged in user, display them on product page, otherwise don’t.
  * If there’s only 1 shipping method, auto-select and skip
  * If there’s only 1 payment method, auto-select and skip
* Run [https://developers.google.com/speed/pagespeed/](PageSpeed) throughout development and follow guidelines to optimize performance.
* Should be a static page template built and used for pages like About us, Contact Us
* Registered customers should have checkout fields pre-populated for them whenever possible.

##Theme customization options
* Preset color schemes (drop-down or color swatches)
* Font-selection drop-down (Google fonts or Typekit) (optional)
  * Needs theme options that integrates with google fonts and/or typekit
* Show manufacturer link on product page: yes/no
* Show product dimensions: yes/no
* Collection to display on homepage
  * Needs smart option for this
* Display blog posts on homepage: yes/no
* Social link URLs
* Promo banner
  * Needs image slider content type to manage
* Display newsletter opt-in in checkout: yes/no
* Choose between checkout types
  * 1-page accordion
  * Simple 3-page
* Code-editor customization option. This would allow you to insert custom CSS, or even tracking snippets on the receipt page.
* Social links in footer should be toggleable. 
 
##Missing topics
These topics are up for discussions.
* Behaviours (form, checkout, drops, etc.)
* Subscription features
* Short codes
* Navigation design (in general)
* Consistent partial names

