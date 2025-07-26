/**
 * General interface for managers working with database models.
 *
 * @template T - Entity type
 * @template CreateDto - DTO for creation
 * @template UpdateDto - DTO for updates
 */
export interface IDatabaseManager<T, CreateDto = T, UpdateDto = Partial<T>> {
    /**
     * Finds an entity by ID.
     */
    findById(id: number): Promise<T | null>;
  
    /**
     * Returns all entities.
     */
    findAll(): Promise<T[]>;
  
    /**
     * Creates a new entity.
     */
    create(data: CreateDto): Promise<T>;
  
    /**
     * Updates an entity by ID.
     */
    update(id: number, data: UpdateDto): Promise<T>;
  
    /**
     * Deletes an entity by ID.
     */
    delete(id: number): Promise<void>;
  }
  