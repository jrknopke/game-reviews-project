class ReviewsController < ApplicationController

    def index
        reviews = Review.all
        render json: reviews.to_json(:include => :comments)
    end

end
