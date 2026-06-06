<script setup lang="ts">
	import { h, resolveComponent } from 'vue';

	type SchemaNode = {
		component: string,
		props?: Record<string, unknown>,
		attributes?: Record<string, unknown>,
		slots?: Record<string, Array<SchemaNode | string>>,
	};

	type SchemaChild = SchemaNode | string;

	const props = defineProps<{
		schema: SchemaNode,
	}>();

	const isNativeElement = (component: string) => /^[a-z]/.test(component);

	const renderChild = (child: SchemaChild) => {
		if (typeof child === 'string') {
			return child;
		}

		return h(LxRuntime, {
			schema: child,
		});
	};

	const renderNode = (node: SchemaNode) => {
		if (isNativeElement(node.component)) {
			return h(node.component, {
				...node.attributes,
				...node.props,
			}, (node.slots?.default ?? []).map(renderChild));
		}

		const component = resolveComponent(node.component);
		const slots = Object.fromEntries(
			Object.entries(node.slots ?? {})
				.filter(([, children]) => children.length > 0)
				.map(([slotName, children]) => [
					slotName,
					() => children.map(renderChild),
				]),
		);

		return h(component, {
			...node.attributes,
			...node.props,
		}, slots);
	};

	const LxRuntime = (runtimeProps: { schema: SchemaNode }) => renderNode(runtimeProps.schema);

	const RenderSchema = () => renderNode(props.schema);
</script>

<template>
	<RenderSchema />
</template>
