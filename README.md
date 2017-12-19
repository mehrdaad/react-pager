# React Basic Pager

A basic component that handles the business logic of navigating paginated content and leaves rendering to the user via a render prop.

Inspired by Kent C. Dodd's [work on advanced React component patterns](https://blog.kentcdodds.com/advanced-react-component-patterns-56af2b74bc5f).

## Install

`npm install --save react-basic-pager`

In addition to `react`, also be sure to have the `prop-types` package installed.

## How Does It Work?

`react-basic-pager` is a compound component made up of two components that share implicit state: `<PagerProvider/>` and `<ConnectedPager/>`.

Every instance of `react-basic-pager` has a central `<PagerProvider/>` component. It accepts configuration via props, including `items` and `itemsPerPage` ([see below](#pagerprovider) for more). You can also pass in a `currentPage` prop, or alternately `<Pager/>` will manage the `currentPage` state for you and allow you to update it through a provided method, `setCurrentPage`. In either case, it handles the business logic of paging through the items based on the given props and passes the resulting pagination state down to all `<ConnectedPager/>` components via [context](https://reactjs.org/docs/context.html).

`<ConnectedPager/>` makes the pagination state available to the user via a render function that is called when the component is rendered. `<ConnectedPager/>` passes the  state into the function as a single parameter: an object composed of the various state properties.

## Quick Start

Import and add a `<PagerProvider/>` component anywhere in your application hierarchy, and configure it via props. All `<ConnectedPager/>` components must be descendants of `<PagerProvider/>` (though they do not have to be direct descendants).

```jsx
import { PagerProvider } from 'react-basic-pager';

import BlogContent from './BlogContent';

// get list of items to page through
const posts = getPosts();

function Blog() {
  return (
    <PagerProvider
      items={posts}
      currentPage={1}
      itemsPerPage={10}
      maxPagesInPageNav={4}
    >
      <div>
        <header>
          <h1>Blog</h1>
        </header>
        <BlogContent/>
      </div>
    </PagerProvider>
  );
}
```

Then import and create a `<ConnectedPager/>` component with a single prop, `render`.

```jsx
import { ConnectedPager } from 'react-basic-pager';

function BlogContent() {
  return (
    <ConnectedPager render={({ items, currentPage, totalPages }) => {
        return (
          <div>
            <div>Page {currentPage} of {totalPages}</div>
            {items.map(item => {
              return (
                <div>
                  <h3>{item.title}</h3>
                  <div>{item.content}</div>
                </div>
              );
            })}
          </div>
        );
      }}
    />
  );
}
```

## Examples

All examples are live and editable on [Code Sandbox](https://codesandbox.io/).

  * [Basic](https://codesandbox.io/s/8zo2lv0pr9)
  * [Pass In Current Page As Prop](https://codesandbox.io/s/m373o33nj9)
  * [Pass In All Props Dynamically](https://codesandbox.io/s/309o24070m)

## <PagerProvider/>

### Props

#### items

> `array` | defaults to `[]`

The list of items to page through

#### currentPage

> `number` | defaults to `1`

The current page being displayed

This, along with `itemsPerPage`, will be used to calculate which items should be passed down to `<ConnectedComponent/>`.

#### itemsPerPage

> `number` | defaults to `10`

The number of items to be displayed per page

This, along with `currentPage`, will be used to calculate which items should be passed down to `<ConnectedComponent/>`.

#### maxPagesInPageNav

> `number` | defaults to `3`

The maximum number of pages in the page navigation

This determines the maximum number of pages in the `pages` property, which is part of the pagination state that's passed to the `<ConnectedPager/>` component's `render` function. [See below](#pages) for more details.


If you omit `currentPage`, the provider will manage the current page state for you. `currentPage` will be initialized to 1 and can be updated via a method, `setCurrentPage`, that will be passed to connected components along with the pagination state.

## <ConnectedPager/>

### Props

#### render

> `function` | _required_

A function that is called every time the component is rendered

### Render Function Parameter

When the render function is called, it is passed a single parameter of an object with the current pagination state. It has the following properties:

#### items

> `array`

The list of items on the current page

This is a subset of the `items` prop passed into the `<PagerProvider/>` component.

#### currentPage

> `number`

The current page

If you pass a `currentPage` prop into `<PagerProvider/>`, this value will be the same as that one. Otherwise, it will be the value of the current page state as managed by `<Pager/>`.

#### totalPages

> `number`

The total number of pages available, derived from the `itemsPerPage` prop and the length of the `items` prop passed into `<PagerProvider/>`.

#### previous

> `number` | `null`

The value of the previous page in the pagination sequence (or `null` if there isn't one, i.e. the current page is the first page)

#### next

> `number` | `null`

The value of the next page in the pagination sequence (or `null` if there isn't one, i.e. the current page is the last page)

#### pages

> `array`

The pages to show in the page navigation

This property is derived from the `maxPagesInPageNav` prop passed into `<PagerProvider/>` and is intended to be used to render the page navigation.

Pages are bunched in groups of length `n`, where `n = maxPagesInPageNav`. So, for example, if `maxPagesInPageNav` is `3` and the current page is `4`, `5`, or `6`, the `pages` property will be `[4, 5, 6]`. If the current page is `7`, `8`, or `9`, `pages` will be `[7, 8, 9]`, and so on.

If there are more pages before or after the current page group, an additional item with the value of `...` will be prepended or appended to the array, respectively.

To see how this can be used to render a useful page navigation, see any of [the examples above](#examples).

#### setCurrentPage

> `function`

A method to set the current page, if you are letting `<Pager/>` manage current page state for you

##### Parameters

###### pageNumber

> `number`

The number to set the current page to
