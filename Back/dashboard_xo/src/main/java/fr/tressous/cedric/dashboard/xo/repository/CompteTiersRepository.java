package fr.tressous.cedric.dashboard.xo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.tressous.cedric.dashboard.xo.model.CompteTiers;

@Repository
public interface CompteTiersRepository extends JpaRepository<CompteTiers, Integer>{

}
