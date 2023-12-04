package apollov2.com.service;

import apollov2.com.entity.Coffee;
import apollov2.com.repository.CoffeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CoffeeService {
    private final CoffeeRepository coffeeRepository;

    public List<Coffee> findAllCoffees() {
        return coffeeRepository.findAll();
    }

    public Coffee findCoffeeById(Long coffeeId) {
        Optional<Coffee> coffee = coffeeRepository.findById(coffeeId);
        if (coffee.isPresent()) {
            return coffee.get();
        }
        // Handle the case where the coffee is not found. Throw an exception or return null.
        throw new RuntimeException("Coffee not found for id: " + coffeeId);
    }

    public Coffee addCoffee(Coffee coffee) {
        return coffeeRepository.save(coffee);
    }

    public void deleteCoffee(Long coffeeId) {
        coffeeRepository.deleteById(coffeeId);
    }
}
