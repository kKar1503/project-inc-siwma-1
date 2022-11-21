// ! Please ignore this file, it will be removed in the next release.

import BaseResponse from './BaseResponse';

class SuccessResponse extends BaseResponse {
  constructor(data) {
    super(200, data);
  }
}

export default SuccessResponse;
