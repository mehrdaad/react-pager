import React, { Component } from 'react';

class Pager extends Component {
  static defaultProps = {
    items: [],
    itemsPerPage: 10,
    defaultCurrentPage: 1,
    maxPagesInPageNav: 3
  };

  initialState = {currentPage: this.props.defaultCurrentPage};
  state = this.initialState;

  setCurrentPage = (page, callback) => {
    if (!this.isCurrentPageControlled()) {
      this.setState({currentPage: page}, () => {
        callback && callback(this.state.currentPage);
      });
    }
  }

  isCurrentPageControlled() {
    return this.props.currentPage !== undefined;
  }

  static getPages = (totalPages, currentPage, maxPages) => {
    const allPages = Array.from({length: totalPages}, (_, i) => i + 1);

    if (totalPages <= maxPages) {
      return allPages;
    }

    let result;

    // if currentPage is within maxPages of the first page
    if (currentPage <= maxPages) {
      result = [...allPages.slice(0, maxPages), '...'];
    }
    // if currentPage is within maxPages of the last page
    else if (currentPage > totalPages - maxPages) {
      result = ['...', ...allPages.slice(-maxPages)];
    }
    else {
      let startOffset;
      const remainder = currentPage % maxPages;

      if (remainder === 1) {
        startOffset = 0;
      }
      else if (remainder === 0) {
        startOffset = maxPages - 1;
      }
      else {
        startOffset = remainder - 1;
      }

      const menuPagesStart = currentPage - 1 - startOffset;
      const menuPagesEnd = menuPagesStart + maxPages;

      result = [
        '...',
        ...allPages.slice(menuPagesStart, menuPagesEnd),
        '...'
      ];
    }
    return result;
  }

  getPagerProps = () => {
    const { render, ...props } = this.props;
    const { items, itemsPerPage, maxPagesInPageNav } = props;

    const currentPage = this.isCurrentPageControlled()
      ? this.props.currentPage
      : this.state.currentPage;

    if (!items.length) {
      return {
        items: [],
        pages: [],
        previous: false,
        next: false,
        currentPage
      }
    }

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const _items = items.slice(start, end);
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const previous = currentPage !== 1 ? currentPage - 1 : false;
    const next = currentPage < totalPages ? currentPage + 1 : false;
    const pages = Pager.getPages(totalPages, currentPage, maxPagesInPageNav);

    return {
      items: _items,
      currentPage: currentPage,
      totalPages: totalPages,
      pages: pages,
      previous: previous,
      next: next
    }

  }
  render() {
    return this.props.render({
      ...this.getPagerProps(),
      setCurrentPage: this.setCurrentPage
    })
  }
}

export default Pager;
