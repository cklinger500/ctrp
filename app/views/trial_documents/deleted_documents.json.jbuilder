json.deleted_documents do

  json.array!(@deleted_documents) do |deleted_doc|

    if deleted_doc.source_document == "Registry"
      deleted_doc.source_document  = "Yes"
    else
      deleted_doc.source_document = "No"
    end

    if deleted_doc.status == "deleted"
      deleted_doc.status  = "Deleted"
    elsif deleted_doc.status == "inactive"
      deleted_doc.status = "Revised"
    end


    json.deleted_doc          deleted_doc
    json.id                   deleted_doc.id
    json.file_name            deleted_doc.file_name
    json.document_type        deleted_doc.document_type
    json.why_deleted          deleted_doc.why_deleted
    json.original             deleted_doc.source_document
    json.deleted_or_revised   deleted_doc.status
    json.updated_at           deleted_doc.updated_at
    json.deleted_by           deleted_doc.deleted_by
    json.deletion_date        deleted_doc.deletion_date

  end

  end