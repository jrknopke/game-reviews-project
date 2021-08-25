class ReviewsController < ApplicationController

    def index
        reviews = Review.all
        render json: reviews.to_json(:include => :comments)
    end

    def update
        review = Review.find(params[:id])
        
        if review.update(review_params)
            render json: Review.all.to_json(:include => :comments)
        else
            render json: {error: "Error"}
        end
    end

    def create
        review = Review.new(review_params)

        if review.save
            render json: Review.all.to_json(:include => :comments)
        else
            render json: {error: "Error"}
        end

    end

    def destroy
        review = Review.find(params[:id])
        review.destroy
        render json: Review.all.to_json(:include => :comments)
    end

    private

    def review_params
        params.require(:review).permit(:title, :content, :likes)
    end

end
