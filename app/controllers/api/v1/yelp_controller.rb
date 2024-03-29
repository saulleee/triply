class Api::V1::YelpController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def search
    response = YelpSearch.retrieve_results(params[:terms], params[:location])
    render json: response
  end
end