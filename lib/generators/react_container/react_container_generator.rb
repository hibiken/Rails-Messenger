class ReactContainerGenerator < Rails::Generators::NamedBase
  source_root File.expand_path('../templates', __FILE__)

  def create_container_file
    destination_path = File.join("app/javascript/packs/containers", "#{file_name}_container.jsx")
    template "container.jsx", destination_path
  end

  private

  def component_name
    file_name.camelize
  end
end
