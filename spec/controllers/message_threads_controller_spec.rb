require 'rails_helper'

RSpec.describe MessageThreadsController do
  describe "POST create" do
    let!(:current_user) { create :user }
    let!(:other_user) { create :user }
    let(:user_ids) { [ other_user.id ] }
    let(:auth_token) { JsonWebToken.encode({ user_id: current_user.id }) }
    let(:auth_headers) { { "Authorization" => "Token #{auth_token}" } }

    before(:each) do
      request.headers.merge! auth_headers
    end

    it 'responds with json' do
      post :create, params: { message_threads: { user_ids: user_ids } }
      expect(response.content_type).to eq('application/json')
    end
  end
end
