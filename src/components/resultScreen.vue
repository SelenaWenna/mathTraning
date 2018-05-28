<template>
	<div class="alert alert-primary">
		<h3>Решено верно: {{ stats.success }}</h3>
		<h3>Решено неправильно: {{ stats.error }}</h3>
		<hr>
		<button class="btn btn-primary" @click="$emit('repeat')">Повторить</button>
		<button class="btn btn-primary" @click="$emit('nextLevel')">Следующий уровень</button>
	</div>
</template>

<script>
	export default {
		props: ['stats']
	}
</script>