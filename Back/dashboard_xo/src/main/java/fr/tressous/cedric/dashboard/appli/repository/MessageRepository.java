package fr.tressous.cedric.dashboard.appli.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.tressous.cedric.dashboard.appli.model.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long>{

}
