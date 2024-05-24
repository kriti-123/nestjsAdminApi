export class CURDmongooseService<T, CreateDto, UpdateDto> {
  model;
  async create(data: CreateDto) {
    try {
      await this.model.create(data);
    } catch (err) {}
  }
}
