/**
 * General interface for repositories working with database models.
 *
 * @template T - The main entity type managed by the repository
 * @template CreateDto - The DTO type used when creating a new entity
 * @template UpdateDto - The DTO type used when updating an entity
 */
export interface IDatabaseRepository<T, CreateDto = T, UpdateDto = Partial<T>> {
  /**
   * Finds a record by its unique identifier.
   *
   * @param id - The unique ID of the record
   * @returns The found entity or null if not found
   */
  findById(id: number): Promise<T | null>;

  /**
   * Retrieves all records of this entity type.
   *
   * @returns A list of all entities
   */
  findAll(): Promise<T[]>;

  /**
   * Creates a new entity with the given data.
   *
   * @param data - The data used to create the entity
   * @returns The newly created entity
   */
  create(data: CreateDto): Promise<T>;

  /**
   * Updates an existing entity identified by its ID.
   *
   * @param id - The ID of the entity to update
   * @param data - The fields to update
   * @returns The updated entity
   */
  update(id: number, data: UpdateDto): Promise<T>;

  /**
   * Deletes an entity by its ID.
   *
   * @param id - The ID of the entity to delete
   */
  delete(id: number): Promise<void>;
}
