package fr.tressous.cedric.dashboard.xo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.tressous.cedric.dashboard.xo.model.Document;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Integer>{

}
