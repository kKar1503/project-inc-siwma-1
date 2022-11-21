// ! Please ignore this file, it will be removed in the next release.

class BaseResponse {
  constructor(status, data) {
    this.status = status;
    this.data = data;

    this.nextObj = null;
    this.prevObj = null;

    if (this.status >= 400) {
      this.error = true;
    }
  }

  //   This method is used to include pagination for items that are needed
  paginateResults(offset, limit, totalItems) {
    this.totalItems = totalItems;

    // Calculate the offset and limits and the output of the nextURL and prevURL is just an object with the offset and limit

    // If the offset + limit is less then totalItems then we know that there is a next page
    if (offset + limit < totalItems) {
      this.nextObj = {
        offset: offset + limit,
        limit: Math.min(limit, totalItems - offset - limit),
      };
    }

    // console.log(offset + limit);
    // console.log(totalItems);
    if (offset > 0 && offset + limit <= totalItems) {
      this.prevObj = {
        offset: Math.max(0, offset - limit),
        limit,
      };
    }

    return this;
  }

  handleResponse(req, res) {
    // Construct the response object
    // Construct the next and previous url if there is prevURL and nextURL

    if (this.nextObj) {
      const { offset, limit } = this.nextObj;
      this.nextURL = `${req.url.split('?')[0]}?offset=${offset}&limit=${limit}`;
    }

    if (this.prevObj) {
      const { offset, limit } = this.prevObj;
      this.prevURL = `${req.url.split('?')[0]}?offset=${offset}&limit=${limit}`;
    }

    const dataToSendBack = {
      _links: {
        previous: this.prevURL || null,
        next: this.nextURL || null,
        offset: parseInt(req.query.offset, 10) || 0,
        limit: parseInt(req.query.limit, 10) || 10,
        total: this.totalItems || null,
      },
      status: this.status,
      error: this.error,
      data: this.data,
    };

    res.status(this.status).json(dataToSendBack);
  }
}

export default BaseResponse;
