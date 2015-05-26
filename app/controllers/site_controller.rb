class SiteController < ApplicationController

  def index
    gon.boot_time = Danboard::BOOTED_AT.to_i
  end
end
