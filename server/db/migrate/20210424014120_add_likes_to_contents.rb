class AddLikesToContents < ActiveRecord::Migration[6.1]
  def change
    add_column :contents, :likes, :integer, :default => 0
  end
end
