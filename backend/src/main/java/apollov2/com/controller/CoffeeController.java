package apollov2.com.controller;

import apollov2.com.entity.Coffee;
import apollov2.com.entity.CoffeeGetDTO;
import apollov2.com.entity.CoffeePostDTO;
import apollov2.com.repository.CoffeeRepository;
import apollov2.com.service.CoffeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/coffee")
public class CoffeeController {
    private final CoffeeRepository coffeeRepository;
    private final CoffeeService coffeeService;
    @GetMapping
    public ResponseEntity<List<CoffeeGetDTO>> getAllCoffees() {
        List<Coffee> coffees = coffeeService.findAllCoffees();

        List<CoffeeGetDTO> coffeeDTOs = coffees.stream()
                .map(coffee -> CoffeeGetDTO.builder()
                        .coffeeId(coffee.getCoffeeId())
                        .name(coffee.getName())
                        .description(coffee.getDescription())
                        .image(coffee.getImage())
                        .price(coffee.getPrice())
                        .stock(coffee.getStock())
                        .size(coffee.getSize())
                        .build())
                .toList();

        return ResponseEntity.ok(coffeeDTOs);
    }
    @GetMapping("/{coffeeId}")
    public ResponseEntity<Coffee> getCoffeeById(@PathVariable Long coffeeId) {
        Coffee coffee = coffeeService.findCoffeeById(coffeeId);
        return ResponseEntity.ok(coffee);
    }

    @PostMapping
    public ResponseEntity<Boolean> addCoffee(@RequestBody CoffeePostDTO dto) {
           Coffee newCoffee = Coffee.builder().
                   price(dto.getPrice())
                   .image(dto.getImage())
                   .name(dto.getName())
                   .description(dto.getDescription())
                   .build();
            coffeeRepository.save(newCoffee);

        return ResponseEntity.ok(true);
    }


}
