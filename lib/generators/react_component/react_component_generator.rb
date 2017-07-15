class ReactComponentGenerator < Rails::Generators::NamedBase
  source_root File.expand_path('../templates', __FILE__)

  argument :attributes,
           type: :array,
           default: [],
           banner: "field[:type] field[:type] ..."

  def create_component_file
    destination_path = File.join("app/javascript/packs/components", "#{file_name}.jsx")
    template "component.jsx", destination_path
  end

  private

  def component_name
    file_name.camelize
  end
end
