import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoEntity} from './entities/estado.entity';
import { CriaEstadoDto } from './dto/cria-estado.dto';
import { v4 as uuid } from 'uuid';
import { ListaEstadoDTO } from './dto/lista-estado.dto';
import { AtualizaEstadoDto } from './dto/atualiza-estado.dto';

@Injectable()
export class EstadoService {
  constructor(
    @InjectRepository(EstadoEntity)
    private readonly estadoRepository: Repository<EstadoEntity>,
  ) {}
	
	async criarEstado(dadosEstado:CriaEstadoDto){
		
		const estadoExistente = await this.estadoRepository.findOne({
      where: { uf: dadosEstado.uf },
    });

		if (estadoExistente) {
      throw new ConflictException(`Já existe um estado com a UF: ${dadosEstado.uf}`);
    }

		const estadoEntity = new EstadoEntity();

		estadoEntity.id = uuid();
		estadoEntity.descricao = dadosEstado.descricao;
		estadoEntity.uf = dadosEstado.uf;

		return this.estadoRepository.save(estadoEntity);
	}

	async buscaTodosEstados() {
		const estadoExistentes = await this.estadoRepository.find();

		const estados = estadoExistentes.map(
			(estado) => new ListaEstadoDTO(estado.id, estado.descricao, estado.uf),
		);

		return estados;
	}

	async buscaEstadoPorDesc(descricao: string){
		const checkDesc = await this.estadoRepository.findOne({
			where:{ descricao },
		})

		return checkDesc;
	}

	async buscaEstadoPorUF(uf: string){
		const checkUF = await this.estadoRepository.findOne({
			where:{ uf },
		})

		return checkUF;
	}

	async buscaEstadoPorID(id: string){
		const checkID = await this.estadoRepository.findOne({
			where:{ id },
		})

		return checkID;
	}

	async atualizarEstado(id: string, estadoEntity: AtualizaEstadoDto) {
		await this.estadoRepository.update(id, estadoEntity);
	}

	async deletarEstado(id: string){
		await this.estadoRepository.delete(id);
	}

}