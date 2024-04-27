package br.uneb.dcet.si20192.tees.manguebemapi.repository;

import br.uneb.dcet.si20192.tees.manguebemapi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
