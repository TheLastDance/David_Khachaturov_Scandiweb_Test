# Scandiweb Junior React Developer test README

read carefully to run this project on your PC

## Clone this repository

Firstly you need to download/clone repository to your PC.

## Clone/download the graphQL endpoint

Then you need to clone graphQL endpoint to repository with that project.

[Endpoint link](https://github.com/scandiweb/junior-react-endpoint)

To start this endpoint, follow these steps

1.Install dependencies - `yarn install`
2.Build the project - `yarn build`
3.Start the project - `yarn start`

## Run project

Use npm start in terminal to run this project with endpoint (data) at your PC.


## Notes depending on previous feedback:

1) + Now I decided to use img tags for that instead of div tags with background image property, because I tried to avoid much style props in code for static styles.
So now I used img tags with object-fit css property to display full images without cropping/stretching. But object-fit is avalaible only in 10th version of Safari, so also I can do this thing
with same div tags and background-image property, we just need to add background-size css property with 'contain' value. So depending on your choice I can change it.

2) + Now all "out of stock" products have identical labels in PDP as in PLP. "Currently unavailable" sentence and product description were deleted.

3) + Hover effect was deleted and highliting on selected currency added. 

4) + Firstly it was hard to understand which problem I had, because everything on windows OS was good. Luckily I had some similar issues with IOS before, 
so I decided to use browserstack website for testing it on IOS (Safari). Then I realized that on some IOS versions I had very big and streched images, 
now I fixed it and tested it by browserstack, but I can't be 100% confident that everything is smooth on IOS, because I tested it with free
version and had very short time for testing.

5) + Price for specific items in cart is not calculating now, so you always will see price only for 1 item, despite the fact that you can have stacked items in cart. Total price is still calculating.

6) + Honestly I had added minicart click outside functionality before, but didn't find in FAQ that it is necessary (unlike with currency select menu) so then I deleted this functionality.
Now I added it again, and everything is working properly.

7) + React-router-dom was added, so now full page is not re-render anymore. Navbar is always on our page and other components render when we switch page.

8) + These problem was solved with react-router-dom parameters and graphQL variables. I installed react-router-dom v5 to get params of the path in my components, because how I know
in v6 we can use only hook method for this. Then I used this params in my graphQL variables to fetch only needed category/product. So now we don't need to fetch all database and use hardcode.
It's much better for optimization.

9) + All hardcode links were removed, except allowed cart link. And I also made redirect from first page to our specific category/all path.  

10) + I simply parsed html markup with interweave library. dangerouslySetInnerHtml method was removed.

11) + I removed style prop and used class toggling instead of it for static/toggling styles. I left style prop only for slider and colors which came from backend.

Depending on your choice I also can add "Not Found" page and some spinner loaders if it is necessary.

