CarrierWave.configure do |config|
  if !Rails.env.test?
    config.fog_credentials = {
      provider:              "AWS",
      aws_access_key_id:     ENV["AWS_ACCESS_KEY_ID"],
      aws_secret_access_key: ENV["AWS_SECRET_ACCESS_KEY"],
      region:                ENV["S3_REGION"]
    }
    
    if Rails.env.production?
      config.fog_directory  = ENV["S3_BUCKET_PRODUCTION"]
    else
      config.fog_directory  = ENV["S3_BUCKET_DEVELOPMENT"]
    end
  end
end