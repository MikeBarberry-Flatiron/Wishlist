class CreateContents < ActiveRecord::Migration[6.1]
  def change
    create_table :contents do |t|
      t.string :category
      t.string :title
      t.float :price
      t.string :store
      t.string :url
      t.string :image
      t.string :description
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
