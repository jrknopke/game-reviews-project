# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Review.create(title: "Battleship", content: "This is my favorite board game ever!")
Review.create(title: "Chess", content: "Chess is a classic game, with limitless outcomes.")


Comment.create(content: "I've beeen playing chess since I was five!", review_id: 2)